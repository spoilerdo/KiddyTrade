const styles = theme => ({
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    gridSpacing: {
        paddingBottom: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
        paddingTop: theme.spacing.unit * 2,
    },
    skinCard: {
        backgroundColor: 'transparent',
    }
})

export default styles;