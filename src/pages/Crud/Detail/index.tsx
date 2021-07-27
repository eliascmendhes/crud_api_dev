/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'

import { Badge, Button, Card } from 'react-bootstrap';
import api from '../../../services/api'
import moment from 'moment';
interface IParamsProps {
    id: string;
}

interface ICrud {
    id: number;
    title: string;
    description: string;
    finished: boolean;
    created_at: Date;
    updated_at: Date;

}

const Detail: React.FC = () => {
    const history = useHistory()
    const { id } = useParams<IParamsProps>();
    const [crud, setNew] = useState<ICrud>()
    useEffect(() => {
        findOne()
    }, [id])
    function back() {
        history.goBack()
    }

    async function findOne() {
        const response = await api.get<ICrud>(`/crud/${id}`)
        console.log(response)
        setNew(response.data)
    }

    function formateDate(date: Date | undefined) {
        return moment(date).format("DD/MM/YYYY")
    }




    return (
        <div className="container">
            <br />
            <div className="crud-header">
                <h1>Crud detalhes</h1>
                <Button size="sm" variant="dark" onClick={back} >Voltar</Button>
            </div>
            <br />

            <Card>
                <Card.Body>
                    <Card.Title>{crud?.title}</Card.Title>
                    <Card.Text>
                    {crud?.description}
                    <br />
                    <Badge className="text-padrao">
                    {crud?.finished ? "Finalizado" : "Pendente"}
                    </Badge>
                    <br />
                    <strong>Data de cadastro:</strong>
                    <Badge className="text-padrao">
                    {formateDate(crud?.created_at)}
                    </Badge>
                    <br />
                    <strong>Atualização:</strong>
                    <Badge className="text-padrao">
                    {formateDate(crud?.updated_at)}
                    </Badge>
                    </Card.Text>

                </Card.Body>
            </Card>


        </div>
    )
}

export default Detail;