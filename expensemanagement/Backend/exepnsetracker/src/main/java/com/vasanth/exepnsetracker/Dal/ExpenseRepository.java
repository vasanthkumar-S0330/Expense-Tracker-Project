package com.vasanth.exepnsetracker.Dal;

import com.vasanth.exepnsetracker.Model.Expense;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface ExpenseRepository extends MongoRepository<Expense, String> {
    List<Expense> findByUserId(String userId);
    void deleteAllByUserId(String userId);

    void deleteByUserId(String userId);

    void deleteByUserIdAndDateBetween(String userId, String fromDate, String toDate);
}





