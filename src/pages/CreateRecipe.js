import React, {useState} from 'react';
import {Button, TextField} from "@material-ui/core";
import {useRef} from "react";
import {useDispatch} from "react-redux";
import {newRecipe} from "../features/recipe";
import {v4 as uuid} from "uuid"


const CreateRecipe = () => {
    const photoRef = useRef()
    const titleRef = useRef()
    const ingredientsRef = useRef()
    const preparationTimeRef = useRef()
    const preparationStepsRef = useRef()
    const disp = useDispatch()

    const emptyRecipe = {
        photos: [],
        title: "",
        ingredients: [],
        preparationTime: 0,
        preparationSteps: [],
        isFav: false,
        reviews: [],
        id: '',
    }

    const [getNewRecipe, setNewRecipe] = useState(emptyRecipe)

    const addPhotos = () => {
        if (photoRef.current.value.includes("http")) {
            setNewRecipe({...getNewRecipe, photos: [...getNewRecipe.photos, photoRef.current.value]})
        } else {
            alert('Please check if the link is correct')
        }
    }

    const addTitle = () => {
        setNewRecipe({...getNewRecipe, title: titleRef.current.value, id: uuid()})
    }

    const addIngredients = () => {
        setNewRecipe({...getNewRecipe, ingredients: [...getNewRecipe.ingredients, ingredientsRef.current.value]})
    }

    const addPreparationTime = () => {
        setNewRecipe({...getNewRecipe, preparationTime: preparationTimeRef.current.value})
    }

    const addPreparationSteps = () => {
        setNewRecipe({
            ...getNewRecipe,
            preparationSteps: [...getNewRecipe.preparationSteps, preparationStepsRef.current.value]
        })
    }

    const addRecipe = () => {
        if (getNewRecipe.photos.length >= 2) {
            if (getNewRecipe.ingredients.length >= 2) {
                disp(newRecipe(getNewRecipe))
                setNewRecipe(emptyRecipe)

            } else alert("add ingredients")
        } else alert("add photos")

    }


    return (
        <div className='d-flex j-center a-center mgt20'>
            <div className='createRecipe d-flex column'>
                <div className='recipeAddField d-flex spb'>
                    <input ref={photoRef} placeholder="Add Images"/>
                    <Button onClick={addPhotos} variant='outlined'>Add images</Button>
                </div>
                <div className='recipeAddField d-flex spb'>
                    <input ref={titleRef} placeholder="Title" variant="standard"/>
                    <Button onClick={addTitle} variant='outlined'>Title</Button>
                </div>
                <div className='recipeAddField d-flex spb'>
                    <input ref={ingredientsRef} placeholder="Add ingredients" variant="standard"/>
                    <Button onClick={addIngredients} variant='outlined'>Add ingredients</Button>

                </div>
                <div className='recipeAddField d-flex spb'>
                    <input ref={preparationTimeRef} placeholder="Preparation time" variant="standard"/>
                    <Button onClick={addPreparationTime} variant='outlined'>Prep. time (minutes)</Button>

                </div>
                <div className='recipeAddField d-flex spb'>
                    <input ref={preparationStepsRef} placeholder="Preparation steps" variant="standard"/>
                    <Button onClick={addPreparationSteps} variant='outlined'>Preparation steps</Button>

                </div>
                <div className='recipeAddField d-flex j-center'>
                    <Button onClick={addRecipe} color='primary' variant='outlined'>Add Recipe</Button>
                </div>
            </div>
        </div>

    );
};

export default CreateRecipe;