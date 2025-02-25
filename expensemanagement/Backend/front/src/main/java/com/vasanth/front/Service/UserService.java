package com.vasanth.front.Service;

import com.vasanth.front.Model.User;
import com.vasanth.front.Repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;


@Service
public class UserService {
    private final UserRepository userRepository;



    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> loginUser(String username, String password) {
        return userRepository.findByUsername(username).stream()
                .filter(user -> user.getPassword().equals(password))
                .findFirst(); // Pick the first valid user
    }
//
//    // ✅ Update Username
//    public boolean updateUsername(String id, String newUsername) {
//        Optional<User> userOptional = userRepository.findById(id);
//        if (userOptional.isPresent()) {
//            User user = userOptional.get();
//            user.setUsername(newUsername);
//            userRepository.save(user);
//            return true;
//        }
//        return false;
//    }
//
//    // ✅ Change Password
//    public boolean changePassword(String id, String oldPassword, String newPassword) {
//        Optional<User> userOptional = userRepository.findById(id);
//        if (userOptional.isPresent()) {
//            User user = userOptional.get();
//            if (user.getPassword().equals(oldPassword)) {
//                user.setPassword(newPassword);
//                userRepository.save(user);
//                return true;
//            }
//        }
//        return false;
//    }
//
//    // ✅ Upload Profile Image
//    public String uploadProfileImage(String id, MultipartFile file) {
//        Optional<User> userOptional = userRepository.findById(id);
//        if (userOptional.isPresent()) {
//            try {
//                String imageUrl = "https://your-storage.com/uploads/" + file.getOriginalFilename(); // Replace with actual upload logic
//                User user = userOptional.get();
//                user.setProfileImageUrl(imageUrl);
//                userRepository.save(user);
//                return imageUrl;
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//        }
//        return null;
//    }





}
