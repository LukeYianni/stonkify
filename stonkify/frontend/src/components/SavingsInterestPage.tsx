
import React, {useState,useEffect} from 'react'
import { Container } from '@chakra-ui/react'
import LineChart from './LineChart'
import UserInputForm from './UserInputForm'
import axios from 'axios'

const SavingsInterestPage = () => {
    
    //Values for the inputs to pass back to the server, used in fields 
    const [initialAmount, setInitialAmount] = useState(0);
    const [monthlyDeposit, setMonthlyDeposit] = useState(0);
    const [interestRate, setInterestRate] = useState(0);
    //Values that populate the graph
    const [xValues, setXValues] = useState([]);
    const [yValues, setYValues] = useState([]);
    //Flag used to change the monthly or yearly view
    const [monthFlag, setMonthFlag] = useState("Months")
    // Fields are the input fields that the app takes, the structure is explained in UserInputForm
    const fields = [
        {
            name:"initialAmount",
            label:"Initial investment amount",
            minimum:0,
            maximum:50000,
            value:initialAmount,
            unit:"£",
            step:10,
            setter:setInitialAmount
        },
        {
            name:"monthlyDeposit",
            label:"Monthly Deposit",
            minimum:0,
            maximum:2000,
            value:monthlyDeposit,
            unit:"£",
            step:10,
            setter:setMonthlyDeposit
        },
        {
            name:"interestRate",
            label:"Interest Rate",
            minimum:0,
            maximum:100,
            value:interestRate,
            unit:"%",
            step:1,
            setter:setInterestRate,
        }
    ]

    useEffect(() => {
        axios({
            method: 'post',
            url: "http://localhost:8000/interest-data/",
            data :{
            initialAmount: initialAmount,
            monthlyDeposit: monthlyDeposit,
            interestRate: interestRate,
            monthFlag: monthFlag,
        }}).then(response=>{
            setXValues(response.data.xValues);
            setYValues(response.data.yValues);
        }).catch(error=>console.log(error))
    }, [initialAmount, monthlyDeposit, interestRate, monthFlag])

    return (
            <Container pt={6}>
                <UserInputForm userInput={fields} monthFlag={setMonthFlag}/>
                <LineChart
                    title="Savings Over time"
                    xAxisData={xValues}
                    yAxisData={yValues}
                    xLabel={monthFlag}
                    yLabel="Amount"
                />
            </Container>
    )
}

export default SavingsInterestPage