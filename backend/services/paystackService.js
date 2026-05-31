const axios = require("axios");
const Course = require("../models/Course");

const PAYSTACK_BASE_URL = "https://api.paystack.co";

/**
 * Initialize Payment
 */
exports.initializeTransaction = async ({
  name,
  email,
  courseId,
}) => {
  // Mock payments for development
  if (process.env.USE_MOCK_PAYMENTS === "true") {
    return {
      authorization_url:
        "http://localhost:5173/payment-success?reference=TEST123",
      reference: "TEST123",
    };
  }

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      throw new Error("Course not found");
    }

    const response = await axios.post(
      `${PAYSTACK_BASE_URL}/transaction/initialize`,
      {
        email,
        amount: course.amount * 100, // Convert to kobo
        callback_url: `${process.env.FRONTEND_URL}/payment-success`,
        metadata: {
          name,
          email,
          courseId,
          courseTitle: course.title,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error(
      "Paystack Initialize Error:",
      error.response?.data || error.message
    );

    throw new Error(
      error.response?.data?.message ||
        "Unable to initialize payment"
    );
  }
};

/**
 * Verify Transaction
 */
exports.verifyTransaction = async (reference) => {
  try {
    const response = await axios.get(
      `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error(
      "Paystack Verification Error:",
      error.response?.data || error.message
    );

    throw new Error(
      error.response?.data?.message ||
        "Payment verification failed"
    );
  }
};

/**
 * List Transactions
 */
exports.getTransactions = async () => {
  try {
    const response = await axios.get(
      `${PAYSTACK_BASE_URL}/transaction`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error(
      "Fetch Transactions Error:",
      error.response?.data || error.message
    );

    throw new Error("Unable to fetch transactions");
  }
};

/**
 * Fetch Single Transaction
 */
exports.getTransaction = async (reference) => {
  try {
    const response = await axios.get(
      `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error(
      "Fetch Transaction Error:",
      error.response?.data || error.message
    );

    throw new Error("Unable to fetch transaction");
  }
};