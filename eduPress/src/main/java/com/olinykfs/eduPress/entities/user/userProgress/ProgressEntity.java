package com.olinykfs.eduPress.entities.user.userProgress;

import java.time.LocalDateTime;

public interface ProgressEntity {
    void setProgressPercentage(int percentage);
    void setCompleted(boolean completed);
    void setUpdatedAt(LocalDateTime time);
}
