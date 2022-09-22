package de.osiem.leaguechat.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import de.osiem.leaguechat.auth.model.friendRequest.FriendRequest;


public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long>{
 
}