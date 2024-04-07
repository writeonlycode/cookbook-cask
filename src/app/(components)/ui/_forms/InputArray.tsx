'use client'

import Input from './Input'
import { dragIcon } from '@/app/(components)/icons/DragIcon'
import { plusIcon } from '@/app/(components)/icons/PlusIcon'
import { trashIcon } from '@/app/(components)/icons/TrashIcon'
import { cn } from '@/utils/cn'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'

export interface InputArrayProps extends React.InputHTMLAttributes<HTMLInputElement> {
  valueArray: []
}

export default function InputArray({ valueArray, className, disabled, ...props }: InputArrayProps) {
  const [inputArray, setInputArray] = useState<any[]>(valueArray || [])
  const [showRemove, setShowRemove] = useState(false)

  const { pending } = useFormStatus()

  return (
    <div className="mb-[3.75rem] flex flex-col gap-[1.5rem] ">
      <Input type="hidden" name="recipe_ingredients" value={JSON.stringify(inputArray)} readOnly />
      <DragDropContext
        onDragStart={() => {
          setShowRemove(true)
        }}
        onDragEnd={(result: any) => {
          const {
            source: { index: sourceIndex },
            destination: { droppableId: destinationId, index: destinationIndex },
          } = result

          if (destinationId === 'recipe-ingredients-droppable') {
            const filteredInputArray = inputArray.filter((_: any, index: number) => index !== sourceIndex)
            const newInputArray = [
              ...filteredInputArray.slice(0, destinationIndex),
              inputArray.at(sourceIndex),
              ...filteredInputArray.slice(destinationIndex),
            ]
            setInputArray(newInputArray.map((item, index) => ({ ...item, weight: index })))
          } else if (destinationId === 'recipe-ingredients-remove') {
            const filteredInputArray = inputArray.filter((_: any, index: number) => index !== sourceIndex)
            setInputArray(filteredInputArray)
          }
          setShowRemove(false)
        }}
      >
        <Droppable droppableId="recipe-ingredients-droppable">
          {(provided) => {
            return (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {inputArray.map((input: any, index: number) => {
                  return (
                    <Draggable key={input.key} draggableId={input.key} index={index}>
                      {(provided) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="mb-[1.5rem] flex items-center gap-[0.5rem]"
                          >
                            <span {...provided.dragHandleProps} className="cursor-grab">
                              {dragIcon}
                            </span>
                            <Input
                              type="text"
                              disabled={disabled}
                              value={input.name}
                              onChange={(e: any) => {
                                const newArray = inputArray.map((v: any, i: number) => {
                                  if (i === index) {
                                    return { ...v, name: e.target.value }
                                  } else {
                                    return v
                                  }
                                })
                                setInputArray(newArray)
                              }}
                              placeholder="Enter ingredient"
                              className="border-outline text-primaryText placeholder:text-secondaryText block w-full rounded-[2rem] border px-[1.5rem] py-[1.1875rem] text-[0.9375rem] font-[500] leading-[1.125rem] tracking-[0.07rem]"
                            />
                          </div>
                        )
                      }}
                    </Draggable>
                  )
                })}
                {provided.placeholder}
              </div>
            )
          }}
        </Droppable>
        <Droppable droppableId="recipe-ingredients-remove">
          {(provided, snapshot) => {
            return (
              <button
                ref={provided.innerRef}
                {...provided.droppableProps}
                type="button"
                className={cn(
                  'border-outline text-primaryText flex w-full items-center justify-center gap-[0.3125rem] rounded-[2rem] border p-[1.1875rem] text-[0.9375rem] font-[500] leading-[1.125rem] tracking-[0.07rem] duration-300',
                  { 'border-secondary text-secondary': showRemove, 'bg-secondary/10': snapshot.isDraggingOver }
                )}
                onClick={() => {
                  setInputArray([...inputArray, { name: '', weight: inputArray.length, key: crypto.randomUUID() }])
                }}
              >
                {showRemove ? (
                  <>
                    <span className="inline-block h-[1rem] w-[1rem]">{trashIcon}</span>
                  </>
                ) : (
                  <>
                    <span className="inline-block h-[1rem] w-[1rem]">{plusIcon}</span>
                  </>
                )}
                <div className="hidden">{provided.placeholder}</div>
              </button>
            )
          }}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
