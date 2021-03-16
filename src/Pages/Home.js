import React, { Component ,useEffect, useState  }  from "react";
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'; 
import { withSnackbar } from 'notistack';
import Logo from "../static/logo.png";
import nonet from "../static/nonet.gif";
class Home extends React.Component{
    constructor(props) {

        super(props);
        this.state = {tag:"",url:""}
      }
convert = () => {
    var data = document.getElementById("url").value;
    if(data == "")
    {
        this.props.enqueueSnackbar('Please enter the url to shorten !!!', { 
            variant: 'error',
            autoHideDuration: 3000,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'center',
          },
         });
       
    }
    else{
        if(data.includes("http://") || data.includes("https://"))
        {
            axios.post("http://localhost:5000/api/v1/shorten?url="+data, {
     
            }).then((response) =>{
              console.log(response);
              if(response.status_== 529){
                this.props.enqueueSnackbar('Please try after sometime !!!', { 
                    variant: 'error',
                    autoHideDuration: 3000,
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'center',
                  },
                 });
              }
               if(response.data.url){
                this.props.enqueueSnackbar('URL Shortened Successfully !!!', { 
                    variant: 'success',
                    autoHideDuration: 3000,
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'center',
                  },
                 });
               }
               this.setState({tag: "The shortened url is provided below"});
               this.setState({url:response.data.url});
               document.getElementById("url").value = "";
               }).catch(err => {
                // what now?
                console.log(err);
                this.props.enqueueSnackbar('Please try after sometime !!!', { 
                    variant: 'error',
                    autoHideDuration: 3000,
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'center',
                  },
                 });
            });  
            
        }
        else{
            this.props.enqueueSnackbar('Doesnt seem to be a valid url !!!', { 
                variant: 'warning',
                autoHideDuration: 3000,
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'center',
              },
             });
        }
    }
   
}
    render(){

        return(
            <div> <br />
                <center>
                 <img src={Logo} width="230px" height="250px" />   <br /><br />
                <TextField 
      required    
      id="url"
      label="Enter the url ..."
      defaultValue=""
      variant="outlined"
     
    /><br /><br />
                <Button variant="outlined"  color="primary" onClick={this.convert}>
    Shorten
  </Button>
  <br /><br />
  <h5 style={{color:"blue"}}>{this.state.tag}</h5><br />
  <h4 style={{color:"white",backgroundColor:"blue",width:"300px",borderRadius:"20px"}}>{this.state.url}</h4>
  <br />
  <img src={nonet} width="100px" height="70px" />
  </center>
            </div>
           
        );
        
    }
}
export default withSnackbar(Home);
