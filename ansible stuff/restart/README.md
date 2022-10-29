
# Uses Ansible to automate restarts in machines

* Creates a Dynamic inventory by first getting a list of machines(based on tags) to restart and then appending ssh key to it
* The yaml file then performs restart on these

Steps
 - ./dynamic_inventory_tomcat.sh (creates a <inventory-file> )
 - ansible-playbook -i <inventory-file> tomcat_restart.yml