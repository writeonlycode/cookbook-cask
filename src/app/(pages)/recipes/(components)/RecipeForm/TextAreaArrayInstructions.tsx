'use client'

import Input from './Input'
import TextArea from './TextArea'
import { dragIcon } from '@/app/(components)/icons/DragIcon'
import { plusIcon } from '@/app/(components)/icons/PlusIcon'
import { trashIcon } from '@/app/(components)/icons/TrashIcon'
import { cn } from '@/utils/cn'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { useState } from 'react'

export default function TextAreaArrayInstructions({ recipe, recipeState, recipeError }: any) {
  const initialInputArray = recipe?.instructions?.map((instruction: any, index: number) => {
    return { ...instruction, key: String(index) }
  })

  const [inputArray, setInputArray] = useState(initialInputArray || [])
  const [showRemove, setShowRemove] = useState(false)

  return (
    <div className="mb-[3.75rem] flex flex-col gap-[1.5rem] ">
      <div className="text-primaryText mb-[0.625rem] text-[1.0625rem] font-[700] leading-[1.6875rem] tracking-[0.03125rem]">
        Steps
      </div>
      <Input type="hidden" name="recipe_instructions" value={JSON.stringify(inputArray)} readOnly />
      <DragDropContext
        onDragStart={() => {
          setShowRemove(true)
        }}
        onDragEnd={(result) => {
          const {
            source: { index: sourceIndex },
            destination: { droppableId: destinationId, index: destinationIndex },
          } = result

          if (destinationId === 'recipe-instructions-droppable') {
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
        <Droppable droppableId="recipe-instructions-droppable">
          {(provided) => {
            return (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {inputArray.map((input: any, index: number) => {
                  return (
                    <Draggable key={input.key} draggableId={input.key} index={index}>
                      {(provided) => {
                        return (
                          <div
                            key={index}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="mb-[1.5rem] flex items-stretch gap-[0.5rem]"
                          >
                            <div className="flex flex-col gap-[1rem]">
                              <div className="bg-mainText relative mt-[0.4rem] flex max-h-[1.5rem] min-h-[1.5rem] min-w-[1.5rem] max-w-[1.5rem] items-center justify-center rounded-full text-[0.75rem] font-[700] text-white">
                                <span className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                                  {index + 1}
                                </span>
                              </div>
                              <span {...provided.dragHandleProps} className="cursor-grab">
                                {dragIcon}
                              </span>
                            </div>
                            <TextArea
                              type="text"
                              disabled={recipeState}
                              rows={4}
                              value={input.text}
                              onChange={(e: any) => {
                                const newArray = inputArray.map((v: any, i: number) => {
                                  if (i === index) {
                                    return { ...v, text: e.target.value }
                                  } else {
                                    return v
                                  }
                                })
                                setInputArray(newArray)
                              }}
                              placeholder="Enter an instruction to prepare the recipe"
                              className="border-outline text-primaryText placeholder:text-secondaryText block w-full rounded-[0.5rem] border px-[1.5rem] py-[1.1875rem] text-[0.9375rem] font-[500] leading-[1.125rem] tracking-[0.07rem]"
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
                  setInputArray([...inputArray, { text: '', weight: inputArray.length, key: crypto.randomUUID() }])
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
