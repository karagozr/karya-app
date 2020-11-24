import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/SearchSharp';

import IconButton from '@material-ui/core/IconButton'

import React, { useState, useEffect } from 'react'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { getFilterProjectCodes,clearFilter,setFilter } from '../../redux';

import { useSelector ,useDispatch} from 'react-redux'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: 0,
        fullWidth: true,
        display: 'flex',
        wrap: 'nowrap'
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    button: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
    root: {
        backgroundColor: '#9ea9b133',
    },
    iconButton: {
        backgroundColor: '#dcdfe0f5',
        width: 48,
        height: 48
    }
}));


const ReportFilterMenu = (props) => {

    const dispatch = useDispatch();

    const reportFilterValues = useSelector(state=>state.reportFilterProjectCodes);
    const reportFilter = useSelector(state=>state.reportFilter);

    const [filterObject, setFilterObject] = useState(reportFilter);
    const [shortCutSelect, setShortCutSelect] = useState({value:'',text:'SEÇİM YOK'});

    const classes = useStyles();


    useEffect(() => {
        dispatch(getFilterProjectCodes())
    }, [dispatch]);

    useEffect(() => {
        return () => dispatch(clearFilter())
    }, [dispatch]);
    
    const propjects = reportFilterValues.filter(prj => prj.projectName !== 'GES KÜMÜLE' && prj.projectName !== 'GES KÜMÜLE AFYON HARİÇ');
    const propjectsShortCuts = reportFilterValues.filter(prj => prj.projectName === 'GES KÜMÜLE' || prj.projectName === 'GES KÜMÜLE AFYON HARİÇ');

    const handleChange = (event) => {
        if (event.target.name === "projects") {
            setShortCutSelect('')
            setFilterObject({ ...filterObject, projects: event.target.value });
        } else if (event.target.name === "currency") {
            setFilterObject({ ...filterObject, currency: event.target.value });
        } else if (event.target.name === "month") {
            setFilterObject({ ...filterObject, month: event.target.value });
        }

    };

    const handleChecked = (e, value, text) => {

        if (value.length === 0) {
            setShortCutSelect({...shortCutSelect,value,text});
            setFilterObject({ ...filterObject, projects: [] });
            return;
        }

        let array = value.split(',');
        setShortCutSelect({...shortCutSelect,value,text});
        setFilterObject({ ...filterObject, projects: array });

        
    }
    
    const handleClick = (event, _deepSearch) => {

        if (filterObject.projects.length < 1) return;

        dispatch(setFilter({ ...filterObject, deepSearch: _deepSearch }));

    }


    return (
        <Card className={classes.root} style={{ margin: '7px', borderRadius: 0 }}>
            <CardContent>
                <Grid container spacing={1}>
                    <Grid item xs={4} sm={4} md={1} >
                        <FormControl className={classes.formControl}>
                            <InputLabel id="plCurrencyCodeLabel">Para Birimi</InputLabel>
                            <Select
                                labelId="plCurrencyCodeLabel"
                                id="plCurrencyCode"
                                name="currency"
                                onChange={handleChange}
                                value={filterObject.currency}
                                defaultValue={filterObject.currency}
                            >
                                <MenuItem value={"TL"}>Türk Lirası</MenuItem>
                                <MenuItem value={"USD"}>ABD Doları</MenuItem>
                                <MenuItem value={"EUR"}>Euro</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4} sm={4} md={1}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="plMonthOfDateLabel">Tarih(Ay)</InputLabel>
                            <Select
                                labelId="plMonthOfDateLabel"
                                id="plMonthOfDate"
                                name="month"
                                onChange={handleChange}
                                value={filterObject.month}
                                defaultValue={filterObject.month}
                            >
                                <MenuItem value={1}>Ocak</MenuItem>
                                <MenuItem value={2}>Şubat</MenuItem>
                                <MenuItem value={3}>Mart</MenuItem>
                                <MenuItem value={4}>Nisan</MenuItem>
                                <MenuItem value={5}>Mayıs</MenuItem>
                                <MenuItem value={6}>Haziran</MenuItem>
                                <MenuItem value={7}>Temmuz</MenuItem>
                                <MenuItem value={8}>Ağustos</MenuItem>
                                <MenuItem value={9}>Eylül</MenuItem>
                                <MenuItem value={10}>Ekim</MenuItem>
                                <MenuItem value={11}>Kasım</MenuItem>
                                <MenuItem value={12}>Aralık</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4} sm={4} md={3}>

                        <FormControl className={classes.formControl} >
                            <InputLabel id="plProjectsShortCutsLabel">Proje Kısayol</InputLabel>
                            <Select
                                labelId="plProjectsShortCutsLabel"
                                id="plProjectsShortCuts"
                                name="projectsShortCuts"
                                //onChange={handleChange}
                                value={shortCutSelect.value}
                                input={<Input id="plProjectsShortCutsMultiSelect" />}
                                renderValue={() => shortCutSelect.text}

                            >
                                <MenuItem key={0} value={''} onClick={(e) => handleChecked(e, '', 'SEÇİM YOK')}>
                                    <ListItemText primary={'SEÇİM YOK'} />
                                </MenuItem>
                                {propjectsShortCuts.map((item) => (
                                    <MenuItem key={item.projectCode} value={item.projectCode} onClick={(e) => handleChecked(e, item.projectCode, item.projectName)}>
                                        <ListItemText primary={item.projectName} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={9} sm={10} md={6}>

                        <FormControl className={classes.formControl} >
                            <InputLabel id="plProjectsLabel">Projeler</InputLabel>
                            <Select
                                labelId="plProjectsLabel"
                                id="plProjects"
                                name="projects"
                                multiple
                                onChange={handleChange}
                                value={filterObject.projects}
                                input={<Input id="plProjectsMultiSelect" />}
                                renderValue={(selected) => selected.join(', ')}

                            >
                                {propjects.map((item) => (
                                    <MenuItem key={item.projectCode} value={item.projectCode}>
                                        <Checkbox checked={filterObject.projects.indexOf(item.projectCode) > -1} />
                                        <ListItemText primary={item.projectCode + ' - ' + item.projectName} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3} sm={2} md={1}>
                        <FormControl className={classes.formControl} style={{ alignItems: 'center' }}>
                            <IconButton className={classes.iconButton} name="search" color="secondary" aria-label="Ara" onClick={(e) => handleClick(e, false)}>
                                <SearchIcon />
                            </IconButton>
                        </FormControl>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}


export default ReportFilterMenu;
