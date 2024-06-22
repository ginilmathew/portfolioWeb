import React from 'react'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';

const DataTable = ({ columns, rows, height, border, borderGrid, id, bg, rowheight }) => {
  return (

    <Box sx={ { height: height ? height : 'calc(100vh - 250px)', minwidth: '100%', m: 3 } }>
      <DataGrid
        style={ {
          background: bg ? bg : "#ffff",
          borderRadius: borderGrid ? borderGrid : '10px',
          opacity: 1,
          fontFamily: 'Raleway, sans-serif',
          fontWeight: 'bold',
          letterSpacing: '.5px',

        } }

        initialState={ {
          pagination: {
            paginationModel: {
              pageSize: 50,

            },
          },
        } }

        editMode="row"
        hideFooterRowCount={ true }
        rows={ rows }
        columns={ columns }
        rowHeight={ rowheight ? rowheight : 60 }

        disableRowCount={ true }


        // rowsPerPageOptions={ [5] }
        disableSelectionOnClick
        experimentalFeatures={ { newEditingApi: true } }
        getRowId={ row => row[id] }
      />

    </Box>

  )
}

export default DataTable