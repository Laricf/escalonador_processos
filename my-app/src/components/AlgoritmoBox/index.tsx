import './algoritmoBox.css'
import { ICondicao } from '../../interfaces/Condicao';
import React, { useState } from 'react';




interface AlgoritmoProps {
    conditions: ICondicao;
    setConditions: React.Dispatch<React.SetStateAction<ICondicao>>;
}

const opcoesMetodos: ICondicao['metodos'][] = ['FIFO', "EDF", "RR",'SJF']
 
const Algoritmo = ({
    conditions,
    setConditions,
    }: AlgoritmoProps) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        {const {id, value} = e.target;
    setConditions({...conditions, [id]: value? parseInt(value): "" });
    };
        
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    useState;

    
    return(
        <div className='corpo' >
            <div className='algoritmo' onSubmit={(e) => e.preventDefault()}>
                <h2 className='titulo' >Selecione o Algoritmo:</h2>
                {opcoesMetodos.map((metodos) => (
                <li className='botoes' >
                    <button className='botao' 
                    type="button"
                    onClick={() => {
                        console.log(`Botão ${metodos} clicado`);
                        setConditions({ ...conditions, metodos: conditions.metodos });
                      }}
                    > {metodos} </button>
                </li>))}
            </div>
            <div className='quantum' >
                <div>
                    <h2 className='titulo' >Quantum:</h2>
                    <input 
                    className='botao' 
                    type='number'
                    min='1'
                    onChange={handleChange}/>
                </div>
                <div>
                    <h2 className='titulo' >Sobrecarga: </h2>
                    <input 
                    className='botao' 
                    type='number' 
                    min='0' 
                    onChange={handleChange}></input>
                </div>
            </div>
        </div>

    );

    };


export default Algoritmo;