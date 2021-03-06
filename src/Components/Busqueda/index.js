import React from "react";
import MaterialTable, { MTableToolbar } from '@material-table/core';
import axios from "axios";
import { useEffect, useState } from "react";
import './Busqueda.css';



function Busqueda () {
    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);

    const columns = [
      {title: "Cuartel", field: 'cuartel', align: 'center', width:'10'}, 
      {title: "Clase", field: 'clase', align: 'center', width:'10'},
      {title: "Lote", field: 'lote', align: 'center', width:'10'},
      {title: "Fosa", field: 'Fosa', align: 'center', width:'40'},
      {title: "Nombre del finado", field: 'finado', width: '20%'},
      {title: "Responsable de la fosa", field: 'responsable', width: '20%'},
      {title: "Adeudo", field: 'adeudo', align: 'center', width:'10'},
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
              color: '#6e7b86',
              fontSize: '18px',
              fontWeight: 'bold',
              backgroundColor: "##FFFFFF",
              fontFamily: 'Helvetica-Nue',
              align: 'center'
            },
            rowStyle: (rowData) => ({
              //backgroundColor: selectedRow === rowData.tableData.id ? "#6ABAC9" : null,
              fontSize: '15px',
            }),
            pageSize: 10,
            searchFieldStyle: {
              fontSize: '18px',
              fontFamily: 'Helvetica-Nue'
            }
          }}
          
          onRowClick={((event, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
          
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

          components={{
            FilterRow: (rowProps) => {
              const { columns, onFilterChanged } = rowProps;
    
              return (
                <>
                  <tr>
                    {columns.map((col) => {
                      if (col.field) {
                        return (
                          <td key={col.field}>
                            <i className="fa-solid fa-filter"></i>
                            <input
                              className="filter"
                              // placeholder="Filtro"
                              id={col.field}
                              onChange={(e) => {
                                onFilterChanged(col.tableData.id, e.target.value);
                              }}
                            />
                          </td>
                        );
                      }
                    })}
                  </tr>
                </>
              );
            },
          }}
        />
      </div>
    );
}

export default Busqueda;

