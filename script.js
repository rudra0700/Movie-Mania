import { getMovieReviewsData } from "./data.js";

const init = () => {
    const moviewReviewdata = getMovieReviewsData();
    
    paintstatus(moviewReviewdata)
}

const paintstatus = (moviewReviewdata) =>{
    const flatReviewData = moviewReviewdata.flat();
    const totalMovies = moviewReviewdata.length;
    const totalReviews = flatReviewData.length;
    const totalRatings = flatReviewData.reduce((acc, item) =>{
       return acc += item.rating   
    },0);

    const avgRating = (totalRatings/totalReviews).toFixed(2)

    const totalMoviesElement =  document.getElementById("total-movies-id");
    addStat(totalMoviesElement, totalMovies); 
    
    const totalRatingsElement =  document.getElementById("total-rating-id");
    addStat(totalRatingsElement, avgRating);
    
    const totalReviewElement =  document.getElementById("total-review-id");
    addStat(totalReviewElement, totalReviews);
    
}

const addStat = (element, value) =>{
    const span = document.createElement("span");
    span.classList.add("text-xl");
    span.innerText = value;
    element.appendChild(span);
} 

init()





