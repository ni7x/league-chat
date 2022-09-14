package de.osiem.leaguechat.auth.model;

import javax.persistence.*;
import lombok.*;

@Entity 
@Data @NoArgsConstructor @AllArgsConstructor
public class Role {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

}
