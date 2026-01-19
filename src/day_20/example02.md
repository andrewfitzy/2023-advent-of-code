```mermaid
---
config:
  theme: redux
  layout: dagre
---
flowchart TB
    broadcaster --> a
    a --> con
    a --> inv
    inv --> b
    b --> con
    con --> output
```
