import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllCountries,
  filterByContinent,
  filterByActivity,
  filterByActivityName,
  sort,
} from '../actions'
import { Link } from 'react-router-dom';
import { Country } from './Country';

import Paginado from "./Paginado";
import styles from './Home.module.css';
import Navbar from './Navbar';
import Error from './Error';


export default function Home() {
  const dispatch = useDispatch()

  const countries = useSelector((state) => state.countries)
  

  useEffect(() => {
    dispatch(getAllCountries())
  }, [dispatch])

  const [order, setOrder] = useState('')

  //uso estados locales para el paginado
  const [currentPage, setCurrentPage] = useState(1) // empiezo en la pag 1
 

const countriesPerPage1 = 9;
const [countriesPerPage, setCountriesPerPage] = useState(countriesPerPage1); //pag1: 9 countries, pag2 en adelante: 10 countries

let indexOfLastCountry;
let indexOfFirstCountry;
let currentCountries;

//const countriesPerPage=10;
const countriesPerPage2 = 10;
if (countriesPerPage === 9) {
  indexOfLastCountry = currentPage * 9;
  indexOfFirstCountry = indexOfLastCountry - 9;
  //currentCountries = countriActiv.slice(
  currentCountries = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );
}

if (countriesPerPage === 10) {
  indexOfLastCountry = currentPage * 10;
  indexOfFirstCountry = indexOfLastCountry - 10;
//  currentCountries = countriActiv.slice(
  currentCountries = countries.slice(
    indexOfFirstCountry - 1,
    indexOfLastCountry - 1
  );
}
const paginado = (pageNumber) => {
  setCurrentPage(pageNumber);
  if (pageNumber >= 2) {
    setCountriesPerPage(countriesPerPage2);
  }
  console.log(countriesPerPage);
  if (pageNumber === 1) {
    setCountriesPerPage(countriesPerPage1);
  }
};


  //filtro por continente
  function handleContinentFilter(e) {
    dispatch(filterByContinent(e.target.value))
    setCurrentPage(1)
    setCountriesPerPage(9)
    if (order) {
      dispatch(sort(order));
    }
 
  }

  //filtro por season de la actividad
  function handleActivityFilter(e) {
    dispatch(filterByActivity(e.target.value))
    setCurrentPage(1)
    setCountriesPerPage(9)
    if (order) {
      dispatch(sort(order));
    }
  }

  


  // Este es el filtro de los nombres de actividades
  //filterByActivityName
  function handleActivityFilterByName2(e) {
  //  dispatch(getAllActivities(e.target.value))
  dispatch(filterByActivityName(e.target.value))
   setCurrentPage(1)
   setCountriesPerPage(9)
   if (order) {
    dispatch(sort(order));
  }
  }

  

  //ordenar por nombre o poblacion
  function handleSort(e) {
    e.preventDefault()
    dispatch(sort(e.target.value))
    setOrder(e.target.value)
    setCurrentPage(1)
    setCountriesPerPage(9)
  }

  /*
  Lógica: en cada pag, voy tomando del array de países (importado del estado global en la constante countries)
  una slice que vaya desde firstIdx hasta lastIdx, sin incluir este último.
  */
  // var lastIdx = currentPage * countriesPerPage // en la primera página, lastIdx = 1 * 9 = 9
  // var firstIdx = lastIdx - countriesPerPage // en la primera página, firstIdx = 9 - 9 = 0
  // var currentCountries = countries.slice(firstIdx, lastIdx) // en la primera página, currentCharacters = countries.slice(0,9)


  function handleClick(e) {
    e.preventDefault()
    dispatch(getAllCountries())
  }

  return (
    <div className={styles.container}>
      <Navbar
        sort={handleSort}
        contFilter={handleContinentFilter}
        actFilter={handleActivityFilter}
        actNameFilter={handleActivityFilterByName2}
        setCurrentPage={setCurrentPage}
        setCountriesPerPage={setCountriesPerPage}
          />

      <div className={styles.btnContainer}>
        <button className={styles.btn} onClick={(e) => handleClick(e)}>
          Reload countries
        </button>

        <button className={styles.btn}>
          <Link className={styles.link} to='/activity'>
            Add Activity
          </Link>
        </button>
      </div>

      

      <div className={styles.countryContainer}>
        {currentCountries.length ? (
          currentCountries.map((c) => (
            <Country
              name={c.name}
              flag={c.flag}
              id={c.id}
              key={c.id}
              continent={c.continent}
            />
          ))
        ) : (
          <Error text={'No countries found. Please try again'} />
        )}
      </div>

     
      <Paginado
          countriesPerPage1={countriesPerPage1}
          countriesPerPage2={countriesPerPage2}
          totalAmount={countries.length}
          paginado={paginado}
      />


    </div>
  )
}
