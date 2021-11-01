INSERT INTO department (department, description)
VALUES
  ('Accounting', 'Book Keeping'),
  ('Finance', 'Corporate Finance'),
  ('Marketing', 'National Campaigns'),
  ('Product Development', 'Engineering and New Products'),
  ('Sales', 'Local and National');

INSERT INTO empRole (title, salary, department_id)
VALUES
  ('manager', 75000.00, 1),
  ('engineer', 85000.00, 4),
  ('outside-sales', 55000.00, 5),
  ('outside-salesmgr', 90000.00, 5),
  ('accountant', 65000.00, 1),
  ('marketing', 35000.00, 3),
  ('marketing-manager', 50000.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, NULL),
  ('Virginia', 'Woolf', 2, 1),
  ('Piers', 'Gaveston', 3, 4),
  ('Charles', 'LeRoi', 4, 5),
  ('Katherine', 'Mansfield', 5, 1),
  ('Dora', 'Carrington', 6, 7),
  ('Edward', 'Bellamy', 7, 1),
  ('Montague', 'Summers', 4, 5),
  ('Octavia', 'Butler', 5, 1);