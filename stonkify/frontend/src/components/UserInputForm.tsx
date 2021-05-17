import { Box, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

//An input is a singal slider input field, instantiated in SavingsInterestPage
//This is likely the most complex part of this app, so here's a runthrough of what each prop is

// name: the name of the input
// label: the label to be shown to the user
// minimum: the minimum value the input can be
// maximum: the maximum value the input can be
// value: the current value of the input, used to show the user next to the slider
// unit: the unit for the input (£ or % in this instance)
// step: the increments that the slider moves by

export interface Input {
    name: string;
    label: string;
    minimum: number;
    maximum: number;
    value: number;
    unit: string;
    step: number;
    setter(number: number): void;
  }

function UserInputForm({userInput, monthFlag}: {userInput: Input[], monthFlag(string: string):void }) 
    {
    return (
        <div>
            {userInput.map(input => (
                <div key={input.name} >
                   {input.label}
                   <div style={{display:"flex"}}>
                       {/* This is Chakra UI's slider, the value the sliders ends on updates the input's state */}
                        <Slider defaultValue={input.minimum} min={input.minimum} max={input.maximum} step={input.step} onChangeEnd={val=>input.setter(val)}>
                            <SliderTrack>
                                <Box position="relative" right={10} />
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb boxSize={6} />
                        </Slider>
                        <div style={{width:"200px", paddingLeft:"20px"}}>
                            {input.unit==="£"&&"£"}
                            {input.value}
                            {input.unit==="%"&&"%"}
                        </div>
                    </div>
                </div>
            ))}
            {/* This toggle changes whether you view the graph per month or year */}
            Granularity:
            <RadioGroup onChange={monthFlag} defaultValue="Months">
                <Stack direction="row">
                    <Radio value="Months">Months</Radio>
                    <Radio value="Years">Years</Radio>
                </Stack>
            </RadioGroup>
        </div>
    ) 
}

export default UserInputForm
