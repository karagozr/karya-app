import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import { history } from './helpers';
import { PrivateRoute } from './_components';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';
import PivotReport from './_components/reports/pivot/pivotReport'
import PlDash from './_components/reports/infograph/plDash'

import { Toast } from './_components/alert';
import { DxLoadPanel } from './_components/load';
import NavBar from './_components/menu/navbar';

import PlTable from './_components/reports/table/plTable'

import MainList from './_components/reports/general/mainList';
import SubList from './_components/reports/general/subList';
import SubDetail from './_components/reports/general/subDetail';
import SubDetailFisNo from './_components/reports/general/subDetailFisNo'

import { BudgetEdit,BudgetList } from './_components';

import { useSelector } from 'react-redux'


const App = () => {

    const { auth } = useSelector(state => state)


    return (
        <div className="jumbotron">
            <div className="container">
                <div className="col-sm-8 col-sm-offset-2">
                    <Toast />
                    <DxLoadPanel />
                    <Router history={history}>
                        {auth.token ? (<NavBar></NavBar>) : (null)}
                        <div id="appMain">
                            <Switch>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />

                                <PrivateRoute path="/pivotreport" component={PivotReport} />
                                <PrivateRoute path="/pltable" component={PlTable} />
                                <PrivateRoute path="/pldash" component={PlDash} />

                                <PrivateRoute path="/BudgetEdit/:projectCode/:budgetYear" component={BudgetEdit} />
                                <PrivateRoute path="/BudgetEdit/:projectCode" component={BudgetList} /> 
                                <PrivateRoute path="/BudgetList" component={BudgetList} />   

                                <PrivateRoute exact path="/mainList" component={MainList} />
                                <PrivateRoute exact path="/mainList/:cariKod" component={SubList} />

                                <PrivateRoute exect path="/mainList/:cariKod/Proje/:projeKod?/FisDetail/:fisNo/:subeKod?" component={SubDetailFisNo} />
                                <PrivateRoute exect path="/mainList/:cariKod/HesapKod/:raporHesapKod?/FisDetail/:fisNo/:subeKod?" component={SubDetailFisNo} />

                                <PrivateRoute exect path="/mainList/:cariKod/Proje/:projeKod?" component={SubDetail} />
                                <PrivateRoute exect path="/mainList/:cariKod/HesapKod/:raporHesapKod?" component={SubDetail} />

                                <Redirect from="*" to="/" />
                            </Switch>
                        </div>
                    </Router>
                </div>
            </div>
        </div>
    );
}

export default App;