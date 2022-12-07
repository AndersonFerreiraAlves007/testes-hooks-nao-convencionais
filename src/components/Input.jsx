import { forwardRef, useState, useImperativeHandle, useRef, useId } from 'react'

function generateRandomColor(){
  const maxVal = 0xFFFFFF;
  let randomNumber = Math.random() * maxVal; 
  randomNumber = Math.floor(randomNumber);
  randomNumber = randomNumber.toString(16);
  const randColor = randomNumber.padStart(6, 0);   
  return `#${randColor.toUpperCase()}`
}

const Input = forwardRef(({ value, onChange }, ref) => {
  const [color, setColor] = useState('')
  const refInput = useRef(null)

  const id = useId()

  console.log(id)

  useImperativeHandle(ref, () => ({
    focus: () => {
      if(refInput.current) {
        refInput.current.focus()
        refInput.current.select()
      }
    },
    changeColor: () => {
      setColor(generateRandomColor())
    }
  }))

  return (
    <div style={{ display: 'flex', flexDirection:'column' }}>
      <label htmlFor={id}>Termo de pesquisa</label>
      <input 
        id={id}
        type="text" 
        value={value} 
        onChange={onChange}
        style={{
          color
        }}
        ref={refInput}
      />
    </div>
  )
})

export default Input