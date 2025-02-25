package com.vasanth.exepnsetracker.Controller;

import com.vasanth.exepnsetracker.Dal.ExpenseRepository;
import com.vasanth.exepnsetracker.Model.Expense;
import com.vasanth.exepnsetracker.Service.ExpenseService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.io.PrintWriter;
import java.io.StringWriter;

import java.util.Map;

import java.util.List;  // <-- Add this line
import java.util.Optional;


@RestController
@RequestMapping("/expenses")
@CrossOrigin(origins = "*")
public class ExpenseController {
    @Autowired
    private ExpenseService expenseService;



    @Autowired
    private ExpenseRepository expenseRepository;







    @PostMapping("/add")
    public Expense addExpense(@RequestBody Expense expense) {
        return expenseService.addExpense(expense);
    }





    @DeleteMapping("/{expenseId}")
    public void deleteExpense(@PathVariable String expenseId) {
        expenseService.deleteExpense(expenseId);
    }

    @DeleteMapping("/deleteAll/{userId}")
    public ResponseEntity<String> deleteUserExpenses(@PathVariable String userId) {
        try {
            expenseService.deleteAllUserExpenses(userId);
            return ResponseEntity.ok("All expenses for user " + userId + " deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting user expenses");
        }
    }



    @GetMapping("/summary/{userId}")
    public Map<String, Double> getSummary(@PathVariable String userId) {
        return Map.of(
                "totalIncome", expenseService.calculateTotalIncome(userId),
                "totalExpenses", expenseService.calculateTotalExpenses(userId),
                "balance", expenseService.calculateBalance(userId)
        );
    }

    // Add this method to get all expenses for the user (or for all users)
    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseService.getAllExpenses();
    }

    // Get expenses for a specific user
    @GetMapping("/user/{userId}")
    public List<Expense> getUserExpenses(@PathVariable String userId) {
        return expenseService.getUserTransactions(userId);
    }



    @GetMapping(value = "/report/{userId}", produces = "text/csv")
    public ResponseEntity<byte[]> generateCsvReport(@PathVariable String userId) {
        List<Expense> expenses = expenseService.getUserTransactions(userId);

        StringWriter stringWriter = new StringWriter();
        PrintWriter writer = new PrintWriter(stringWriter);

        // CSV Header
        writer.println("Name,Amount,Type,Date");

        // Writing data
        for (Expense expense : expenses) {
            writer.printf("%s,%.2f,%s,%s%n",
                    expense.getName(),
                    expense.getAmount(),
                    expense.getType(),
                    expense.getDate()
            );
        }


        writer.flush();

        byte[] csvBytes = stringWriter.toString().getBytes(); // Convert to byte array

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=expenses_report.csv");
        headers.add(HttpHeaders.CONTENT_TYPE, "text/csv; charset=UTF-8");

        return new ResponseEntity<>(csvBytes, headers, HttpStatus.OK);
    }

    @PutMapping("/{expenseId}")
    public ResponseEntity<?> updateExpense(@PathVariable String expenseId, @RequestBody Expense updatedExpense) {
        try {
            Expense expense = expenseService.updateExpense(expenseId, updatedExpense);
            return ResponseEntity.ok(expense);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Expense not found: " + expenseId);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating expense");
        }
    }


    @DeleteMapping("/deleteByDate/{userId}")
    public ResponseEntity<String> deleteExpensesByDate(
            @PathVariable String userId,
            @RequestParam String fromDate,
            @RequestParam String toDate) {

        try {
            expenseRepository.deleteByUserIdAndDateBetween(userId, fromDate, toDate);
            return ResponseEntity.ok("Expenses deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting expenses");
        }
    }













}
