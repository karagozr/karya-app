import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import withBreadcrumbs from "react-router-breadcrumbs-hoc";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const BreadCrumbs = (props) => {

    const nameWillChange = [{ key: 'MainList', caption: 'Liste' }]
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                {props.breadcrumbs.map(({ breadcrumb, match }, index) => {

                    if (props.linkParams === undefined) return

                    if (props.linkParams.find(x => x === breadcrumb.props.children)) {
                        if (nameWillChange.find(x => x.key === breadcrumb.props.children)) {
                            return (<div className="bc" key={match.url}>
                                <Link color="inherit" href={match.url || ""}>{nameWillChange.find(x => x.key === breadcrumb.props.children).caption}</Link>
                            </div>)
                        } else {
                            return (<div className="bc" key={match.url}>
                                <Link color="inherit" href={match.url || ""}>{breadcrumb}</Link>
                            </div>)
                        }

                    }

                })}
            </Breadcrumbs>
        </div>


    );
}

export default withBreadcrumbs()(BreadCrumbs);