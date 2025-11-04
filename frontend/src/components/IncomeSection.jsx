import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Plus, DollarSign } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const incomeCategories = ['Salary', 'Freelance', 'Business', 'Investments', 'Gift', 'Other'];

const IncomeSection = ({ onUpdate }) => {
  const [incomes, setIncomes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Salary',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const fetchIncomes = async () => {
    try {
      const response = await axios.get(`${API}/income`);
      setIncomes(response.data);
    } catch (error) {
      console.error('Error fetching incomes:', error);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/income`, {
        ...formData,
        amount: parseFloat(formData.amount)
      });
      setFormData({
        title: '',
        amount: '',
        category: 'Salary',
        description: '',
        date: new Date().toISOString().split('T')[0]
      });
      setShowForm(false);
      fetchIncomes();
      onUpdate();
    } catch (error) {
      console.error('Error creating income:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/income/${id}`);
      fetchIncomes();
      onUpdate();
    } catch (error) {
      console.error('Error deleting income:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Income Button */}
      {!showForm && (
        <Button onClick={() => setShowForm(true)} className="w-full bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Income
        </Button>
      )}

      {/* Add Income Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="e.g., Monthly Salary"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {incomeCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              placeholder="Add a note..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
              Add Income
            </Button>
            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      {/* Income List */}
      <div className="space-y-3">
        {incomes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <DollarSign className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No income records yet. Add your first income!</p>
          </div>
        ) : (
          incomes.map((income) => (
            <div key={income.id} className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-md transition-shadow">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">💵</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{income.title}</h3>
                    <p className="text-sm text-gray-500">{income.category} • {income.date}</p>
                    {income.description && (
                      <p className="text-sm text-gray-600 mt-1">{income.description}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-bold text-green-600">+${income.amount.toFixed(2)}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(income.id)}
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

export default IncomeSection;
