import { Box, Modal, Typography } from "@mui/material";



function SuccessModal({modalOpen, modalClose = Function.prototype}) {

    


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#4eff00',
        borderRadius: '15px',
        boxShadow: 24,
        p: 4,
      };

    return (
        <Modal
            open={modalOpen}
            onClose={modalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2"sx={{textAlign:'center'}}>
                    Thank you!
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, textAlign:'center'}}>
                Registration completed successfully
                </Typography>
            </Box>

        </Modal>
    )
}

export default SuccessModal;