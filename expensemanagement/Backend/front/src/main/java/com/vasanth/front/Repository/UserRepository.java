package com.vasanth.front.Repository;

import com.vasanth.front.Model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    List<User> findByUsername(String username);

}
