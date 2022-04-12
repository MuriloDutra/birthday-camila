import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import "./ImageDialog.scss"

function Transition(props) {
    return <Slide direction="up" {...props} />
}

class ImgDialog extends React.Component {
    state = {
        open: false,
    }

    handleClickOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    render() {
        return (
            <Dialog
                fullScreen
                open={!!this.props.img}
                onClose={this.props.onClose}
                TransitionComponent={Transition}
            >
                <div>
                    <AppBar>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                onClick={this.props.onClose}
                                aria-label="Close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography
                                variant="title"
                                color="inherit"
                            >
                                Cropped image
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <div>
                        <img src={this.props.img} alt="Cropped" />
                    </div>
                </div>
            </Dialog>
        )
    }
}

export default ImgDialog
