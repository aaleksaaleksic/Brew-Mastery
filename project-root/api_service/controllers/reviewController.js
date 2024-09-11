const { Review, Coffee } = require('../models');
const axios = require('axios');

// Funkcija za proveru korisnika preko auth_servisa
const verifyUser = async (token) => {
  try {
    const response = await axios.get('http://localhost:8001/auth/verify-token', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Unauthorized');
  }
};

// Kreiranje nove recenzije
const createReview = async (req, res) => {
  const { rating, comment, coffeeId } = req.body;
  const token = req.header('Authorization')?.split(' ')[1];
  
  try {
    const user = await verifyUser(token);
    
    const review = await Review.create({
      rating,
      comment,
      coffeeId,
      userId: user.id
    });
    res.status(201).json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Error creating review' });
  }
};

// Dohvatanje svih recenzija
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({ include: [Coffee] });
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Error fetching reviews' });
  }
};

// Ažuriranje recenzije (samo korisnik može ažurirati svoju recenziju)
const updateReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment,coffeeId } = req.body;
  const token = req.header('Authorization')?.split(' ')[1];
  
  try {
    const user = await verifyUser(token);
    const review = await Review.findByPk(id);
    
    if (review && review.userId === user.id) {
      review.rating = rating;
      review.comment = comment;
      review.coffeeId = coffeeId;
      await review.save();
      res.status(200).json(review);
    } else {
      res.status(403).json({ error: 'Access denied or review not found' });
    }
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ error: 'Error updating review' });
  }
};

// Brisanje recenzije (samo korisnik može obrisati svoju recenziju)
const deleteReview = async (req, res) => {
  const { id } = req.params;
  const token = req.header('Authorization')?.split(' ')[1];
  
  try {
    const user = await verifyUser(token);
    const review = await Review.findByPk(id);
    
    if (review) {
      await review.destroy();
      res.status(204).json();
    } else {
      res.status(403).json({ error: 'Access denied or review not found' });
    }
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: 'Error deleting review' });
  }
};


const getReviewById = async (req, res) => {
    const { id } = req.params;
    
    try {
      const review = await Review.findByPk(id, {
        include: [Coffee] // Uključujemo Coffee model radi potpunijih podataka
      });
      
      if (review) {
        res.status(200).json(review);
      } else {
        res.status(404).json({ error: 'Review not found' });
      }
    } catch (error) {
      console.error('Error fetching review:', error);
      res.status(500).json({ error: 'Error fetching review' });
    }
  };

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview
};
