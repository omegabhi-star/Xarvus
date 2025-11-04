import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Plus, ShoppingBag } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const expenseCategories = [
  { name: 'Food', icon: '🍔' },
  { name: 'Transport', icon: '🚗' },
  { name: 'Entertainment', icon: '🎬' },
  { name: 'Shopping', icon: '🛍️' },
  { name: 'Bills', icon: '📱' },
  { name: 'Health', icon: '💊' },
  { name: 'Education', icon: '📚' },
  { name: 'Other', icon: '💰' }
];

const ExpenseSection = ({ onUpdate }) => {
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Food',
    description: '',
    date: new Date().toISOString().split('T')[0],
    icon: '🍔'
  });

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`${API}/expense`);
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleCategoryChange = (category) => {
    const selected = expenseCategories.find(cat => cat.name === category);
    setFormData({ 
      ...formData, 
      category, 
      icon: selected?.icon || '💰' 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/expense`, {
        ...formData,
        amount: parseFloat(formData.amount)
      });
      setFormData({
        title: '',
        amount: '',
        category: 'Food',
        description: '',
        date: new Date().toISOString().split('T')[0],
        icon: '🍔'
      });
      setShowForm(false);
      fetchExpenses();
      onUpdate();
    } catch (error) {
      console.error('Error creating expense:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/expense/${id}`);
      fetchExpenses();
      onUpdate();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Expense Button */}
      {!showForm && (
        <Button onClick={() => setShowForm(true)} className="w-full bg-red-600 hover:bg-red-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Expense
        </Button>
      )}

      {/* Add Expense Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-red-50 rounded-lg border border-red-200">
          <div className="space-y-2">
            <Label htmlFor="expense-title">Title</Label>
            <Input
              id="expense-title"
              placeholder="e.g., Groceries"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expense-amount">Amount</Label>
            <Input
              id="expense-amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expense-category">Category</Label>
            <Select value={formData.category} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {expenseCategories.map((cat) => (
                  <SelectItem key={cat.name} value={cat.name}>
                    <span className="flex items-center gap-2">
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expense-date">Date</Label>
            <Input
              id="expense-date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expense-description">Description (Optional)</Label>
            <Input
              id="expense-description"
              placeholder="Add a note..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700">
              Add Expense
            </Button>
            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      {/* Expense List */}
      <div className="space-y-3">
        {expenses.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <ShoppingBag className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No expense records yet. Add your first expense!</p>
          </div>
        ) : (
          expenses.map((expense) => (
            <div key={expense.id} className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-md transition-shadow">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">{expense.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{expense.title}</h3>
                    <p className="text-sm text-gray-500">{expense.category} • {expense.date}</p>
                    {expense.description && (
                      <p className="text-sm text-gray-600 mt-1">{expense.description}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-bold text-red-600">-${expense.amount.toFixed(2)}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(expense.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExpenseSection;
