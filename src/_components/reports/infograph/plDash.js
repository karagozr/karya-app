import React, { useEffect} from 'react'
import PlCard from "../infograph/plCard.js"
import './plDash.css';
import ReportFilterMenu from '../reportFilterMenu'
import { useSelector, useDispatch } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import { clearPlDashValuesActions } from '../../../redux'
import Card from '@material-ui/core/Card';

const PlDash = (props) => {

    const dispatch = useDispatch();
    const {reportFilter } = useSelector(state => state)

    useEffect(() => {
        dispatch(clearPlDashValuesActions());
    }, [reportFilter,dispatch]);

    return (
        <div>
            <ReportFilterMenu />
            <Card style={{ margin: '7px', borderRadius: 0 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={2}>
                        <div className="row" style={{ marginBottom: 10 }}>
                            <PlCard headerColor={'#46B976'} cardColor={'#AEF7CC'} name="Toplam Gelir" params={{ ...reportFilter, moment: true, plReportType: 1 }} />
                        </div>
                        <div className="row" style={{ marginBottom: 10 }}>
                            <PlCard headerColor={'#46B976'} cardColor={'#50D989'} name="Toplam Gelir (Küm.)" params={{ ...reportFilter, moment: false, plReportType: 1 }} />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <div className="row" style={{ marginBottom: 10 }}>
                            <PlCard headerColor={'#EB5959'} cardColor={'#FCBEBE'} name="Personel Gider" params={{ ...reportFilter, moment: true, plReportType: 2 }} />
                        </div>
                        <div className="row" style={{ marginBottom: 10 }}>
                            <PlCard headerColor={'#EB5959'} cardColor={'#FC9999'} name="Personel Gider (Küm.)" params={{ ...reportFilter, moment: false, plReportType: 2 }} />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <div className="row" style={{ marginBottom: 10 }}>
                            <PlCard headerColor={'#EB5959'} cardColor={'#FCBEBE'} name="İşletme Gider" params={{ ...reportFilter, moment: true, plReportType: 3 }} />
                        </div>
                        <div className="row" style={{ marginBottom: 10 }}>
                            <PlCard headerColor={'#EB5959'} cardColor={'#FC9999'} name="İşletme Gider (Küm.)" params={{ ...reportFilter, moment: false, plReportType: 3 }} />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <div className="row" style={{ marginBottom: 10 }}>
                            <PlCard headerColor={'#EB5959'} cardColor={'#FCBEBE'} name="Tesis Gider" params={{ ...reportFilter, moment: true, plReportType: 4 }} />
                        </div>
                        <div className="row" style={{ marginBottom: 10 }}>
                            <PlCard headerColor={'#EB5959'} cardColor={'#FC9999'} name="Tesis Gider (Küm.)" params={{ ...reportFilter, moment: false, plReportType: 4 }} />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <div className="row" style={{ marginBottom: 10 }}>
                            <PlCard headerColor={'#EB5959'} cardColor={'#FCBEBE'} name="Toplam Gider" params={{ ...reportFilter, moment: true, plReportType: 5 }} />
                        </div>
                        <div className="row" style={{ marginBottom: 10 }}>
                            <PlCard headerColor={'#EB5959'} cardColor={'#FC9999'} name="Toplam Gider (Küm.)" params={{ ...reportFilter, moment: false, plReportType: 5 }} />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <div className="row" style={{ marginBottom: 10 }}>
                            <PlCard headerColor={'#66C6F2'} cardColor={'#B1E6FD'} name="Ebitda" params={{ ...reportFilter, moment: true, plReportType: 6 }} />
                        </div>
                        <div className="row" style={{ marginBottom: 10 }}>
                            <PlCard headerColor={'#66C6F2'} cardColor={'#87D6F8'} name="Ebitda (Küm.)" params={{ ...reportFilter, moment: false, plReportType: 6 }} />
                        </div>
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}

export default PlDash;