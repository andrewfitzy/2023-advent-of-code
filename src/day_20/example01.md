
```mermaid
---
config:
  theme: redux
  layout: dagre
---
flowchart TB
    broadcaster --> a
    broadcaster --> b
    broadcaster --> c
    a --> b
    b --> c
    c --> inv
    inv --> a

```