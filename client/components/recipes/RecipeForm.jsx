import React, { useState } from 'react';
import axios from 'axios';
import {
  FormControl,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  TextField,
  Stack,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import IngredientInput from './IngredientInput.jsx';

function RecipesForm({ makingRecipe, setMakingRecipe }) {
  const [formValues, setFormValues] = useState(
    { name: '',
      ingredients: ['', '', ''],
  });
  const addIngredient = () => {
    // Make a copy of the formValues
    const formCopy = {...formValues};
    // Add an empty string to the end of the ingredients array
    formCopy.ingredients.push('');
    // Set formValues in state to the formCopy
    setFormValues(formCopy);
  }
  return (
      <Dialog
        open={makingRecipe}
        maxWidth='md'
        fullWidth
        >
        <DialogTitle
          sx={{ }}
        >
          Build a Recipe
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid>
              {formValues.ingredients.map((ingredient, step = 0) => {
                step++;
                return <IngredientInput key={step}value={ingredient} />
              })}
              <Button
                variant="text"
                onClick={addIngredient}
              >+ Add Ingredient
              </Button>
            </Grid>
            <Grid>
            <TextField
              label="Recipe name"
            />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setMakingRecipe(false); }}>Cancel</Button>
          <Button>Save</Button>
        </DialogActions>
      </Dialog>
  )
}

export default RecipesForm;
