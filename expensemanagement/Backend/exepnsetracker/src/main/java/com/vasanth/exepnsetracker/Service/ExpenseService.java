package com.vasanth.exepnsetracker.Service;

import com.vasanth.exepnsetracker.Dal.ExpenseRepository;

import com.vasanth.exepnsetracker.Model.Expense;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;



import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {
    @Autowired
    private ExpenseRepository expenseRepository;





    public Expense addExpense(Expense expense) {
        return expenseRepository.save(expense);
    }


    public ResponseEntity<String> deleteExpensesByDate(String userId, String fromDate, String toDate) {
        try {
            // Delete expenses for the given user within the date range
            expenseRepository.deleteByUserIdAndDateBetween(userId, fromDate, toDate);
            return ResponseEntity.ok("Expenses deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting expenses");
        }
    }

    // Get all transactions for a user
    public List<Expense> getUserTransactions(String userId) {
        return expenseRepository.findByUserId(userId);
    }

    public void deleteExpense(String expenseId) {
        expenseRepository.deleteById(expenseId);
    }

    public double calculateTotalIncome(String userId) {
        return expenseRepository.findByUserId(userId)
                .stream()
                .filter(expense -> "income".equalsIgnoreCase(expense.getType()))
                .mapToDouble(Expense::getAmount)
                .sum();
    }

    public double calculateTotalExpenses(String userId) {
        return expenseRepository.findByUserId(userId)
                .stream()
                .filter(expense -> "expense".equalsIgnoreCase(expense.getType()))
                .mapToDouble(Expense::getAmount)
                .sum();
    }

    public double calculateBalance(String userId) {
        return calculateTotalIncome(userId) - calculateTotalExpenses(userId);
    }





    // Existing methods...

    // Get all expenses for the app (or you can adjust this to fit your needs)
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();  // This will fetch all expenses from the DB
    }

    public Expense updateExpense(String expenseId, Expense updatedExpense) {
        return expenseRepository.findById(expenseId).map(existingExpense -> {
            existingExpense.setDate(updatedExpense.getDate());
            existingExpense.setItemName(updatedExpense.getItemName());
            existingExpense.setName(updatedExpense.getName());
            existingExpense.setAmount(updatedExpense.getAmount());
            existingExpense.setType(updatedExpense.getType());
            return expenseRepository.save(existingExpense);
        }).orElseThrow(() -> new RuntimeException("Expense with ID " + expenseId + " not found"));
    }


    public void deleteAllUserExpenses(String userId) {
        expenseRepository.deleteByUserId(userId);
    }
}


