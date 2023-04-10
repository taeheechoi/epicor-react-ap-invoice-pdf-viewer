import React, { useState } from 'react';
import axios from 'axios';
import PDFViewer from './components/pdf-viewer';
import { Container, Grid, TextField, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const baseURL = process.env.REACT_APP_BASE_URL;
const epicorUserID = process.env.REACT_APP_EPICOR_USERID;
const epicorPassword = process.env.REACT_APP_EPICOR_PASSWORD;

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(4),
  },

  submitButton: {

    marginTop: theme.spacing(2),
  },
  message: {
    marginTop: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();
  const [base64Pdf, setBase64Pdf] = useState(null);
  const [company, setCompany] = useState('');
  const [vendorNumber, setVendorNumber] = useState(0);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [xFileRefNum, setXFileRefNum] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();

    axios.get(`${baseURL}/Erp.BO.APInvoiceSvc/APInvoices(${company},${vendorNumber},${invoiceNumber})/APInvHedAttches`, {
      auth: {
        username: epicorUserID,
        password: epicorPassword
      }
    })
      .then(response => {
        
        setXFileRefNum(response.data.value[0].XFileRefNum)
        console.log(response.data.value[0].XFileRefNum)
      })
    
    axios.post(`${baseURL}/Ice.BO.AttachmentSvc/DownloadFile`, {
      "xFileRefNum": xFileRefNum
    }, {
      auth: {
        username: epicorUserID,
        password: epicorPassword
      }
    })
      .then(response => {
        console.log()
        setBase64Pdf(response.data.returnObj);
      })

  };


  return (
    <Container maxWidth="sm">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            AP Invoice Viewer
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
              variant="outlined"
              label="Company"
              type="text"
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              fullWidth
              required
              margin="dense"
            />
            <TextField
              variant="outlined"
              label="Vendor Number"
              type="text"
              name="vendorNumber"
              value={vendorNumber}
              onChange={(e) => setVendorNumber(e.target.value)}
              fullWidth
              required
              margin="dense"
            />
            <TextField
              variant="outlined"
              label="AP Invoice Number"
              type="text"
              name="invoiceNumber"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              fullWidth
              required
              margin="dense"
            />
            <div className={classes.submitButton}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                View PDF
              </Button>
            </div>
          </form>

          <PDFViewer pdf={base64Pdf} />
        </Grid>
      </Grid>

    </Container>

  );

}
export default App;
