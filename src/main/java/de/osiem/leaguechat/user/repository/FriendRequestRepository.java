package de.osiem.leaguechat.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import de.osiem.leaguechat.user.model.friendRequest.FriendRequest;


public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long>{
}