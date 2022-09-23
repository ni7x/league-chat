package de.osiem.leaguechat.auth.model.friendRequest;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import de.osiem.leaguechat.auth.model.user.User;
import lombok.*;

@Entity 
@Data @NoArgsConstructor @AllArgsConstructor
public class FriendRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties({"friendRequestsFrom", "friendRequestsTo"})
    private User from;

    @ManyToOne
    @JsonIgnoreProperties({"friendRequestsFrom", "friendRequestsTo"})
    private User to;

}
