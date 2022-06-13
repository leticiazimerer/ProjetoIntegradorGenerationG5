import React, { ChangeEvent, useEffect, useState } from 'react'
import { Container, Typography, TextField, Button, Select, InputLabel, FormControl, FormHelperText, MenuItem } from "@material-ui/core"
import { useNavigate, useParams } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import './CreateOrder.css';
import Kit from '../../../models/Kit';
import Ong from '../../../models/Ong';
import { search, searchId, post, put, } from '../../../services/Services';
import Order from '../../../models/Order';
import OrderDTO from '../../../models/dtos/OrderDTO';
import { type } from 'os';


// const api = 'https://planeta-solidario-gen.herokuapp.com/index.html/api';

function CreateOrder() {

    let navigate = useNavigate();
    const [token, setToken] = useLocalStorage('token');
    const [email, setEmail] = useLocalStorage('email');
    const [kits, setKits] = useState<Kit[]>([]);
    const [Ongs, setOngs] = useState<Ong[]>([]);

    const [Ong, setOng] = useState<Ong>({
        id: 0,
        email:'',
        password:'',
        NameAgent:'',
        type:'',
    });

    const [kit, setKit] = useState<Kit>({
        id: 0,
        name: '',
        productClass: '',
        price: 0,
        expirationDate: ''
    });

    
    const [orderDTO, setOrderDTO] = useState<OrderDTO>({
        emailCreator: email,
        idKit: kit.id
    })

    //user?filter[UserType]=ONG

    useEffect(() => {
        getKits()
        if (token === "") {
            alert("Você precisa estar logado")
            navigate("/login")
        }
    }, [token]);

    useEffect(() => {
        setOrderDTO({
            ...orderDTO,
            idKit: kit.id
        })
    }, [orderDTO])

    //// useEffect(() => {
    ////     if(text){
    ////         fetch('${api}users?filter[ONG]=${text}')
    ////           .then((response) => response.json())
                

    ////     }

    //// }, [text]);

    
    async function getKits() {
        await search("/api/Kit", setKits, {
            headers: {
                'Authorization': token
            }
        })
    }

    async function getOngs(){
        await search("/api/Users", setOngs, {
            headers: {
                'Authorization': token
            }
        })
    }
 

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        await post("/api/Orders", orderDTO, setOrderDTO, {
            headers: {
                'Authorization': token
            }
        })
        alert('Doação cadastrada com sucesso');

        back()
    }
    

    function back() {
        navigate('/homelog')
    }

    return (
        <Container maxWidth="sm">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Compra</Typography>
                <TextField value={email} id="emailCreator" label="Email" variant="outlined" name="emailCreator" margin="normal" fullWidth />

                <FormControl >
                    <InputLabel id="demo-simple-select-helper-label">Kit </InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={(e) => searchId(`/api/Kit/id/${e.target.value}`, setKit, {
                            headers: {
                                'Authorization': token
                            }
                        })}>
                        {
                            kits.map(unit => (
                                <MenuItem value={unit.id}>{unit.name}</MenuItem>
                            ))
                        }
                    </Select>
                    <FormHelperText>Escolha o Kit</FormHelperText> 
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={(e) => searchId(`/api/User/${e.target.value}`, setOng, {
                            headers: {
                                'Authorization': token
                            }
                        })}>
                            {   
                                Ongs.map(unit => (
                                    <MenuItem value={unit.id}>{unit.type}</MenuItem>
                                ))
                            }
                    </Select>
                    <FormHelperText>Escolha a ong</FormHelperText>                                        
                    <Button type="submit" variant="contained" color="primary">
                        Finalizar
                    </Button>
                </FormControl>
            </form>
        </Container>
    )
}
export default CreateOrder;