package com.vasanth.front.Controller;

import com.vasanth.front.Model.User;
import com.vasanth.front.Service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/auth")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        userService.registerUser(user);
        return "Signup successful!";
    }
    @PostMapping("/login")
    public String login(@RequestBody User user) {
        return userService.loginUser(user.getUsername(), user.getPassword())
                .map(u -> "Login successful!")
                .orElse("Invalid credentials");
    }
//
//    // ✅ Update Username
//    @PutMapping("/update-username/{id}")
//    public ResponseEntity<String> updateUsername(@PathVariable String id, @RequestParam String newUsername) {
//        boolean updated = userService.updateUsername(id, newUsername);
//        return updated ?
//                ResponseEntity.ok("Username updated successfully") :
//                ResponseEntity.status(400).body("Failed to update username");
//    }
//
//    // ✅ Change Password
//    @PutMapping("/change-password/{id}")
//    public ResponseEntity<String> changePassword(@PathVariable String id, @RequestParam String oldPassword, @RequestParam String newPassword) {
//        boolean updated = userService.changePassword(id, oldPassword, newPassword);
//        return updated ?
//                ResponseEntity.ok("Password updated successfully") :
//                ResponseEntity.status(400).body("Incorrect old password");
//    }
//
//    // ✅ Upload Profile Image
//    @PostMapping("/upload-profile-image/{id}")
//    public ResponseEntity<String> uploadProfileImage(@PathVariable String id, @RequestParam("file") MultipartFile file) {
//        String imageUrl = userService.uploadProfileImage(id, file);
//        return imageUrl != null ?
//                ResponseEntity.ok("Profile image updated successfully!") :
//                ResponseEntity.status(400).body("Failed to upload image");
//    }









}

