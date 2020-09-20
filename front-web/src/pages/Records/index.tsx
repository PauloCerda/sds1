import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { formatDate } from './helpers';
import Pagination from './Pagination';
import './styles.css';
import { RecordsResponse } from './types';
import Filters from '../../components/Filters';

const BASE_URL = 'https://sds1-paulo.herokuapp.com';

const Records = () => {
    const [ recordsResponse, setRecordsResponse ] = useState<RecordsResponse>();
    const [activePage, setActivePage] = useState(0);
    
    useEffect(() => {
        Axios.get(`${BASE_URL}/records?linesPerPage=12&page=${activePage}`)
            .then(Response => setRecordsResponse(Response.data));
    }, [activePage]);

    const handlePageChange = (index: number) => {
        setActivePage(index)
    }

    return (
        <div className="page-container">
            <Filters link="/charts" linkText="VER GRÁFICO" />
            <table className="records-table" cellPadding="0" cellSpacing="0">
                <thead>
                    <tr>
                        <th>INSTANTE</th>
                        <th>NOME</th>
                        <th>IDADE</th>
                        <th>PLATAFORMA</th>
                        <th>GENERO</th>
                        <th>TÍTULO DO GAME</th>
                    </tr>
                </thead>
                <tbody>
                    {recordsResponse?.content.map(record => (
                      <tr key={record.id}>
                        <td>{formatDate(record.moment)}</td>
                        <td>{record.name}</td>
                        <td>{record.age}</td>
                        <td className="text-secondary">{record.gamePlatform}</td>
                        <td>{record.genreName}</td>
                        <td className="text-primary">{record.gameTitle}</td>
                      </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
            activePage={activePage}
            goToPage={handlePageChange}
            totalPages={recordsResponse?.totalPages}
            />            
        </div>
    );
}

export default Records;