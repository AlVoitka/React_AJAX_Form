import { Box, Modal, Typography } from "@mui/material";



function ErrorModal({modalErrOpen, modalErrClose = Function.prototype}) {

    


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#d31400',
        borderRadius: '15px',
        boxShadow: 24,
        p: 4,
      };

    return (
        <Modal
            open={modalErrOpen}
            onClose={modalErrClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2"sx={{textAlign:'center'}}>
                    Invalid registration
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, textAlign:'center'}}>
                Server side error
                </Typography>
            </Box>

        </Modal>
    )
}

export default ErrorModal;