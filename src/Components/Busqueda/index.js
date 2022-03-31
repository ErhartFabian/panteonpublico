import React from "react";
import MaterialTable, { MTableToolbar } from '@material-table/core';
import axios from "axios";
import { useEffect, useState } from "react";
import './Busqueda.css';


function Busqueda () {
    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);

    const columns = [
      {title: "Cuartel", field: 'cuartel', align: 'center'},
      {title: "Clase", field: 'clase', align: 'center'},
      {title: "Lote", field: 'lote', align: 'center'},
      {title: "Fosa", field: 'fosa', align: 'center'},
      {title: "Nombre del Finado", field: 'finado'},
      {title: "Responsable de la fosa", field: 'responsable'},
      {title: "Adeudo", field: 'adeudo', align: 'center'},
    ]
  
    const URL = 'http://localhost:3001/panteon';
  
    useEffect(()=>{
      const peticionGET = async () => {
        const datan = await axios.get(URL);
        setData(datan.data);
      }
      peticionGET();
    },[]);
  
    return (
      <div className="App">
        <MaterialTable
          columns={columns}
          data={data}
          title = 'Filtro Funerario'
          options={{
            filtering: true,
            headerStyle: {
              backgroundColor: '#b3acab',
              fontSize: '23px',
              fontFamily: 'TimesNewRoman',
              
              justifyContent: 'center'
            },
            rowStyle: {
              fontSize: '20px',
              fontFamily: 'TimesNewRoman',
            },
            pageSize: 10,
            searchFieldStyle: {
              fontSize: '22px'
            }
          }}
          
          onRowClick={((selectedRow) => setSelectedRow(selectedRow.tableData))}
          
          localization={
            {
              pagination: {
                labelRowsSelect: 'Filas',
                labelDisplayedRows: '{from}-{to} de {count}'
              },
              toolbar:{
                searchPlaceholder: 'Buscar',
              },
              body: {
                emptyDataSourceMessage: 'No hay datos coincidentes'
              }
            }
          }
        />
      </div>
    );
}

export default Busqueda;

