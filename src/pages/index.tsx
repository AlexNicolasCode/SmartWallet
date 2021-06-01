import Head from 'next/head'
import Image from 'next/image'
import { useContext, useState } from 'react'
import { GetProps } from '../components/getProps'
import { useMensages } from '../contexts/mapMensages'
// import styles from '../styles/Home.module.css'

export default function Home() {
  const { msg, allMsg, setMsg, addNewMensage } = useMensages()

  return (
    <div>
      {allMsg.map((prop, index) => (
        <li key={index}>{prop}</li>
      ))}
      <input type="text" value={msg} onChange={event => setMsg(event.target.value)}/>
      <button type="submit" onClick={addNewMensage}>Send</button>
    </div>
  )
}
