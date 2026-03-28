package web.proiect.model;

import jakarta.persistence.*; 

@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(name = "points")
    private Integer points = 0; // Inițializăm cu 0

    private String email;

    @Enumerated(EnumType.STRING)
    private Role role;

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public Role getRole() {
        return role;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Integer getPoints() {
            return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public User(Long id, String username, String password, Integer points, String email, Role role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.points = points;
        this.email = email;
        this.role = role;
    }
    
    public User() {
    }

}

