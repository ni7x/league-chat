package de.osiem.leaguechat.conversations.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;

import de.osiem.leaguechat.user.model.user.User;
import lombok.Data;

@Data
@Entity
public class Conversation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "conversations")
    @JsonIgnoreProperties({"conversations", "friends", "friendRequestsTo", "friendRequestsFrom"})
    private Set<User> participants = new HashSet<User>();

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @OrderBy("createdAt ASC")
    private Set<Message> messages = new HashSet<Message>();

    public Message getLastMessage(){
        if(messages.size() > 0){
            return messages.toArray(new Message[messages.size()])[messages.size() - 1];
        }
        return null;
    }
}
