package de.osiem.leaguechat.conversations.model;

import java.util.Date;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import de.osiem.leaguechat.user.model.user.User;
import lombok.Data;

@Data
@Entity
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JsonIgnore
    private Conversation conversation;

    @ManyToOne
    @JsonIgnoreProperties({"conversations", "friends", "friendRequestsTo", "friendRequestsFrom"})
    private User author;
    
    @Column(length = 2000)
    private String content;
    private Date createdAt = new Date();

    private boolean isDeleted = false;

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Message)) {
            return false;
        }
        Message message = (Message) o;
        return Objects.equals(id, message.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, content, createdAt);
    }

   


}
