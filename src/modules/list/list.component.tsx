import React from 'react';
import { createLocalHooks, useEzActions, useEzState } from 'store/hooks';

import { TextField, Grid, Button, Box } from "@material-ui/core";
import MaterialTable from 'material-table';

import { tableIcons } from 'utils/importIcons'
import { ListModel } from './list.store';
import { useEffect } from 'react';
import { DateTime } from 'luxon';
//ajouter la validation (avec joi ?)
//Numéro de page auto
//Un loader
//Liste
//Tester les classes EZPZ
//Poster
//Login

const { useLocalState, useLocalActions } = createLocalHooks<ListModel>(s => s.list)


export function List() {

  const listState = useLocalState(S => S)
  const listActions = useLocalActions(A => A)

  //Alternative : 
  // const listState =  useEzState(s=>s.list)
  // const listActions =  useEzActions(a=>a.list)

  useEffect(()=>{
    !listState.isLoaded && listActions.handleRefresh()
  },[listState.isLoaded])

  return (
    <MaterialTable
      icons={tableIcons}
      columns={[
        { field: "couponId", title: "Référence" },
        { field: "customerName", title: "Client" },
        { field: "createdAt", title: "Créé le", render: (row: any) => DateTime.fromISO(row.createdAt).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY) },
        { field: 'isConsumed', title: "Etat", render: (row: any) => row.isConsumed ? "Scanné" : row.isActive ? "Actif" : "Désactivé" },
        { field: "bakeryName", title: "Boulangerie" },
      ]}

      data={listState.data}

      actions={[
        {
          icon: () => <tableIcons.Refresh />,
          tooltip: 'Rafraichir les données',
          isFreeAction: true,
          onClick: () => listActions.handleRefresh()
        }
      ]}
      options={{
        grouping: false,
        filtering: true,
        pageSize: 50,
        pageSizeOptions: [10, 20, 50, 100, 300],
      }}
    />

  )
}