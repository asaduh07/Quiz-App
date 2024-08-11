import { createSlice} from '@reduxjs/toolkit';
import { fetchTags, fetchQuestions } from './thunks';

const DEFAULT_TIMER = 30; //Default timer value in seconds

const quizSlice = createSlice({
    name: 'quiz',
    initialState: {
        questions: [], // List of quiz questions
        tags: [],  // Available tags for selection
        selectedTags: [], // Tags selected by the user
        currentQuestionIndex: 0, // Index of the current question
        timer: DEFAULT_TIMER, // Timer for each question
        score: 0, // User's score
        tagCount: 20, // Number of tags user must select to start quiz
        isQuizFinished: false,  // Indicates if the quiz is finished
        loading: false, // for tracking loading status
        error: null, // for tracking errors
    },
    reducers: {
        setQuestions: (state, action) => {
            state.questions = action.payload;
        },
        selectTag: (state, action) => {
            // Add a tag to selectedTags if less than "tagcount" tags are selected and it isn't already selected
            if (state.selectedTags.length < state.tagCount && !state.selectedTags.includes(action.payload)) {
                state.selectedTags.push(action.payload);
            }

        },
        removeTag: (state, action) => {
            // Remove a tag from selectedTags
            state.selectedTags = state.selectedTags.filter(tag => tag !== action.payload);
        },
        resetTags: (state) => {
            // Reset selectedTags to an empty array
            state.selectedTags = [];
        },
        nextQuestion: (state) => {
            // Move to the next question and reset the timer, or finish the quiz if no more questions
            if (state.currentQuestionIndex < state.questions.length - 1) {
                state.currentQuestionIndex += 1;
                state.timer = DEFAULT_TIMER; // Reset timer
            } else {
                state.isQuizFinished = true;
            }
        },
        updateScore: (state, action) => {
            // Increment the score by the payload value
            state.score += action.payload;
        },
        decrementTimer: (state) => {
            // Decrease the timer by 1, and move to the next question if the timer reaches 0
            if (state.timer > 0) {
                state.timer -= 1;
            } else {
                state.dispatch(nextQuestion());
            }
        },
        resetQuiz: (state) => {
            // Reset all quiz-related state to their initial values
            state.currentQuestionIndex = 0;
            state.selectedTags = [];
            state.timer = DEFAULT_TIMER;
            state.score = 0;
            state.isQuizFinished = false;
        },
    },
    extraReducers: (builder) => {
        // Handle pending, fulfilled, and rejected states for fetchTags
        builder
            .addCase(fetchTags.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTags.fulfilled, (state, action) => {
                state.loading = false;
                state.tags = action.payload;
            })
            .addCase(fetchTags.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Handle pending, fulfilled, and rejected states for fetchQuestions
            .addCase(fetchQuestions.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.loading = false;
                state.questions = action.payload;
            })
            .addCase(fetchQuestions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    setQuestions,
    selectTag,
    removeTag,
    resetTags,
    nextQuestion,
    updateScore,
    decrementTimer,
    resetQuiz
} = quizSlice.actions;

//Reducer
const quizReducer = quizSlice.reducer;
export default quizReducer;
//Selector
export const quizSelector = (state) => state.quiz;
