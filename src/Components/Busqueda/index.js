import React, { useMemo, useState, useEffect } from "react";
import MaterialTable, { MTableToolbar } from '@material-table/core';
import axios from "axios";
import './Busqueda.css';

function Busqueda() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);

    const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';
    const ENDPOINT = process.env.REACT_APP_API_PANTEON_ENDPOINT || '/panteon';
    const URL = `${BASE_URL}${ENDPOINT}`;

    useEffect(() => {
        const peticionGET = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get(URL);
                
                if (response.data && Array.isArray(response.data)) {
                    setData(response.data);
                } else {
                    console.error('Formato de respuesta inválido');
                    setError('Los datos no tienen el formato esperado');
                    setData([]);
                }
            } catch (err) {
                console.error('Error al obtener datos:', err);
                setError('No se pudieron cargar los datos. Por favor, intente más tarde.');
                setData([]);
            } finally {
                setLoading(false);
            }
        };
        
        peticionGET();
    }, [URL]);

    const columns = useMemo(() => [
        { title: "Cuartel", field: 'cuartel', align: 'center', width: '10%' },
        { title: "Clase", field: 'clase', align: 'center', width: '10%' },
        { title: "Lote", field: 'lote', align: 'center', width: '10%' },
        { title: "Fosa", field: 'Fosa', align: 'center', width: '40%' },
        { title: "Nombre del finado", field: 'finado', width: '20%' },
        { title: "Responsable de la fosa", field: 'responsable', width: '20%' },
        { title: "Adeudo", field: 'adeudo', align: 'center', width: '10%' },
    ], []);

    const tableOptions = useMemo(() => ({
        filtering: true,
        headerStyle: {
            color: '#6e7b86',
            fontSize: '18px',
            fontWeight: 'bold',
            backgroundColor: '#FFFFFF',
            fontFamily: 'Helvetica-Neue, sans-serif',
            textAlign: 'center'
        },
        rowStyle: {
            fontSize: '15px',
        },
        pageSize: 10,
        searchFieldStyle: {
            fontSize: '18px',
            fontFamily: 'Helvetica-Neue, sans-serif'
        },
        exportButton: false,
        loadingType: 'linear'
    }), []);

    const localization = useMemo(() => ({
        pagination: {
            labelRowsSelect: 'Filas',
            labelDisplayedRows: '{from}-{to} de {count}'
        },
        toolbar: {
            searchPlaceholder: 'Buscar',
        },
        body: {
            emptyDataSourceMessage: loading ? 'Cargando datos...' : 'No hay datos coincidentes'
        }
    }), [loading]);

    if (error) {
        return (
            <div className="App">
                <div className="error-container" role="alert">
                    <h2>Error al cargar datos</h2>
                    <p>{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="btn-retry"
                        aria-label="Reintentar carga de datos"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="App">
            <MaterialTable
                columns={columns}
                data={data}
                title="Filtro Funerario"
                options={tableOptions}
                onRowClick={(event, rowData) => setSelectedRow(rowData.tableData?.id || null)}
                localization={localization}
                components={{
                    Toolbar: (props) => (
                        <MTableToolbar {...props} />
                    ),
                }}
                isLoading={loading}
            />
            {selectedRow !== null && (
                <div className="selected-row-info" role="status">
                    <p>Fila seleccionada: {selectedRow}</p>
                </div>
            )}
        </div>
    );
}

export default React.memo(Busqueda);

