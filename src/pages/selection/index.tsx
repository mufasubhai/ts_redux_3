// import { useState, useEffect } from 'react';
import Dropdown from 'src/features/dropdown/Dropdown';
import styles from './Selection.module.css'
import { PrismaClient } from '@prisma/client';
import { GetStaticProps } from 'next';
import { AppState } from 'src/app/store';
import { useSelector } from 'react-redux';

type Selectors = {
	departments?: Array<String>
	errors? : String
	dates? : Array<String>
  }
  export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
	  console.log("static props!")
	  const prisma = new PrismaClient()

	 const distinctDepts = await prisma.hierarchy.findMany({
		distinct: 'dept',
		orderBy: {
		  dept: 'asc',
		},
	  })


	  const distinctDates = await prisma.date.findMany({
		distinct: 'fiscalYear',
		orderBy: { 
			fiscalYear: 'asc'
		}
	  })

	  console.log(distinctDates)

	  const distinctDeptsArray = distinctDepts.map(el => el.dept)
	  const distinctDatesArray = distinctDates.map(el => el.fiscalYear?.toString())
	//   distinctDepts = distinctDepts.map(el => el.dept)
	//   console.log(distinctDatesArray)
	//   distinctDepts = Object.values(distinctDepts)
	//   console.log(distinctDeptsArray)


		
	//   const otbSampleHistorySelectors = prisma.otbSampleHistory.findMany()
	//   const item = sampleUserData.find((data) => data.id === Number(id))
	//   By returning { props: item }, the StaticPropsDetail component
	  // will receive `item` as a prop at build time
	  return { props: { departments: distinctDeptsArray, dates: distinctDatesArray  } }
	} catch (err: any) {
		console.log(err) 
	  return { props: { errors: err.message } }
	}
  }

  

const selectionIndex = ({ departments, errors, dates }: Selectors) => {

	console.log(departments)
	console.log(dates)

 const dateValues = useSelector((state: AppState) => state.dropdown.dateValues) 
 const departmentValues = useSelector((state: AppState) => state.dropdown.departmentValues) 


  return (
    <div className={"Wrapper"}>

    {console.log(departmentValues)}
    {console.log(dateValues)}



    <div className={styles.wrapper}>

		{departments && departments.length > 0 ? <Dropdown key={"department"} type={"department"} items={departments} selected={departmentValues}/> : null}
		{departments && departments.length > 0 ? <Dropdown  key={"date"} type={"date"} items={dates} selected={dateValues}/> : null}

    </div>
		


	{errors ? <>error</> : null}

      {/* <header className={styles.header}>
        <img src="/logo.svg" className={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className={styles.link}
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className={styles.link}
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className={styles.link}
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className={styles.link}
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header> */}
    </div>
  )
}

export default selectionIndex

